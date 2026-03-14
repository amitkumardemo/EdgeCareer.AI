import { NextResponse } from "next/server";
import { getFirebaseUser } from "@/lib/auth-utils";
import { db } from "@/lib/prisma";
import { calculateRankingScore } from "@/lib/ranking-algorithm";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export async function POST(req) {
    try {
        const firebaseUser = await getFirebaseUser();
        if (!firebaseUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const uid = firebaseUser.uid;

        // Verify user is TPO
        const tpo = await db.user.findUnique({
            where: { uid: uid },
            select: { role: true, collegeId: true, college: { select: { name: true } } },
        });

        if (tpo?.role !== "TPO") {
            return NextResponse.json({ error: "Unauthorized: TPO access required" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const format = searchParams.get("format") || "pdf";
        const topN = parseInt(searchParams.get("topN") || "10");

        const body = await req.json();
        const filters = body.filters || {};

        // Get students based on filters
        const students = await db.user.findMany({
            where: {
                collegeId: tpo.collegeId,
                role: "STUDENT",
                ...(filters.branch && filters.branch !== "all" && { branch: filters.branch }),
                ...(filters.year && filters.year !== "all" && { year: parseInt(filters.year) }),
                ...(filters.section && filters.section !== "all" && { section: filters.section }),
            },
            select: {
                id: true,
                name: true,
                branch: true,
                year: true,
                section: true,
                rollNumber: true,
                githubUsername: true,
                leetcodeUsername: true,
            },
        });

        // Get GitHub activities and calculate scores
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 30);

        const activities = await db.gitHubActivity.findMany({
            where: {
                userId: { in: students.map(s => s.id) },
                date: { gte: cutoffDate },
            },
        });

        const rankedStudents = students.map(student => {
            const studentActivities = activities.filter(a => a.userId === student.id);
            const scores = calculateRankingScore(studentActivities);
            return {
                ...student,
                score: scores.overallScore,
            };
        });

        rankedStudents.sort((a, b) => b.score - a.score);
        const topStudents = rankedStudents.slice(0, topN);

        if (format === "xlsx") {
            // Create Excel workbook
            const worksheetData = [
                ["Rank", "Name", "Roll Number", "Branch", "Year", "Section", "GitHub Username", "LeetCode Username", "Score"],
                ...topStudents.map((s, i) => [
                    i + 1,
                    s.name || "",
                    s.rollNumber || "",
                    s.branch || "",
                    s.year || "",
                    s.section || "",
                    s.githubUsername || "",
                    s.leetcodeUsername || "",
                    s.score?.toFixed(1) || "0.0",
                ]),
            ];

            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Student Rankings");

            // Generate buffer
            const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

            return new NextResponse(excelBuffer, {
                headers: {
                    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "Content-Disposition": `attachment; filename="student-rankings-${new Date().toISOString().split("T")[0]}.xlsx"`,
                },
            });
        }

        // Generate PDF
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text(`Student Rankings - ${tpo.college?.name || "College"}`, 14, 20);

        // Add metadata
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Total Students: ${topStudents.length}`, 14, 36);

        // Add table
        const tableData = topStudents.map((s, i) => [
            i + 1,
            s.name || "",
            s.rollNumber || "",
            s.branch || "",
            `${s.year}th`,
            s.githubUsername || "",
            s.score?.toFixed(1) || "0.0",
        ]);

        doc.autoTable({
            startY: 45,
            head: [["Rank", "Name", "Roll No", "Branch", "Year", "GitHub", "Score"]],
            body: tableData,
            theme: "grid",
            headStyles: { fillColor: [59, 130, 246] },
            styles: { fontSize: 8 },
        });

        const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="student-rankings-${new Date().toISOString().split("T")[0]}.pdf"`,
            },
        });
    } catch (error) {
        console.error("Export error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
