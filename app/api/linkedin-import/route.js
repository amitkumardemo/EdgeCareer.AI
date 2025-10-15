import { NextResponse } from "next/server";
import puppeteer from 'puppeteer';

export async function POST(request) {
  try {
    const { linkedinUrl } = await request.json();

    if (!linkedinUrl) {
      return NextResponse.json({ error: "LinkedIn URL is required" }, { status: 400 });
    }

    // Validate LinkedIn URL format
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (!linkedinRegex.test(linkedinUrl)) {
      return NextResponse.json({ error: "Invalid LinkedIn profile URL format" }, { status: 400 });
    }

    // Launch browser and scrape LinkedIn profile
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();

      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      // Navigate to LinkedIn profile
      await page.goto(linkedinUrl, { waitUntil: 'networkidle2' });

      // Wait for content to load
      await page.waitForTimeout(3000);

      // Extract profile data
      const profileData = await page.evaluate(() => {
        const data = {
          name: '',
          summary: '',
          experience: [],
          education: [],
          skills: [],
          projects: []
        };

        // Extract name
        const nameElement = document.querySelector('h1.text-heading-xlarge');
        if (nameElement) {
          data.name = nameElement.textContent?.trim() || '';
        }

        // Extract summary/about section
        const summarySelectors = [
          '[data-section="summary"] .pv-about__summary-text',
          '.pv-about__summary-text',
          '[data-section="about"] .inline-show-more-text',
          '.pv-about-section .pv-about__summary-text'
        ];

        for (const selector of summarySelectors) {
          const summaryElement = document.querySelector(selector);
          if (summaryElement) {
            data.summary = summaryElement.textContent?.trim() || '';
            break;
          }
        }

        // Extract experience
        const experienceItems = document.querySelectorAll('.experience-item, .pv-entity__summary-info');
        experienceItems.forEach((item, index) => {
          if (index >= 3) return; // Limit to 3 experiences

          const title = item.querySelector('.pv-entity__summary-info h3')?.textContent?.trim() ||
                       item.querySelector('.t-16.t-black.t-bold')?.textContent?.trim() || '';

          const company = item.querySelector('.pv-entity__secondary-title')?.textContent?.trim() ||
                         item.querySelector('.t-14.t-black.t-normal')?.textContent?.trim() || '';

          const duration = item.querySelector('.pv-entity__date-range span:last-child')?.textContent?.trim() ||
                          item.querySelector('.t-14.t-black--light')?.textContent?.trim() || '';

          const description = item.querySelector('.pv-entity__description')?.textContent?.trim() ||
                             item.querySelector('.t-14.t-black')?.textContent?.trim() || '';

          if (title || company) {
            data.experience.push({
              title: title || 'Position Title',
              company: company || 'Company Name',
              duration: duration || 'Duration',
              description: description || 'Job description'
            });
          }
        });

        // Extract education
        const educationItems = document.querySelectorAll('.education__list-item, .pv-entity__summary-info');
        educationItems.forEach((item, index) => {
          if (index >= 2) return; // Limit to 2 education entries

          const degree = item.querySelector('.pv-entity__degree-name .pv-entity__comma-item')?.textContent?.trim() ||
                        item.querySelector('.t-16.t-black.t-bold')?.textContent?.trim() || '';

          const institution = item.querySelector('.pv-entity__school-name')?.textContent?.trim() ||
                             item.querySelector('.t-14.t-black.t-normal')?.textContent?.trim() || '';

          const year = item.querySelector('.pv-entity__dates span:last-child')?.textContent?.trim() || '';

          if (institution) {
            data.education.push({
              degree: degree || 'Degree',
              institution: institution,
              year: year || 'Year'
            });
          }
        });

        // Extract skills
        const skillElements = document.querySelectorAll('.pv-skill-category-entity__name, .pv-skill-entity__skill-name');
        skillElements.forEach((skill, index) => {
          if (index >= 10) return; // Limit to 10 skills
          const skillName = skill.textContent?.trim();
          if (skillName && !data.skills.includes(skillName)) {
            data.skills.push(skillName);
          }
        });

        // Extract projects if available
        const projectItems = document.querySelectorAll('.pv-accomplishment-entity');
        projectItems.forEach((item, index) => {
          if (index >= 2) return; // Limit to 2 projects

          const title = item.querySelector('.pv-accomplishment-entity__title')?.textContent?.trim() || '';
          const description = item.querySelector('.pv-accomplishment-entity__description')?.textContent?.trim() || '';

          if (title) {
            data.projects.push({
              title: title,
              description: description || 'Project description',
              technologies: '',
              link: ''
            });
          }
        });

        return data;
      });

      await browser.close();

      // Format the data for the frontend
      const formattedData = {
        summary: profileData.summary,
        skills: profileData.skills.join(', '),
        experience: profileData.experience.map(exp => ({
          title: exp.title,
          company: exp.company,
          duration: exp.duration,
          description: exp.description
        })),
        education: profileData.education.map(edu => ({
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year
        })),
        projects: profileData.projects.map(proj => ({
          title: proj.title,
          description: proj.description,
          technologies: proj.technologies,
          link: proj.link
        }))
      };

      return NextResponse.json({
        success: true,
        message: "LinkedIn profile data extracted successfully",
        data: formattedData,
        profileName: profileData.name
      });

    } catch (scrapeError) {
      await browser.close();
      console.error("Scraping error:", scrapeError);
      return NextResponse.json({
        error: "Failed to extract LinkedIn data. The profile might be private or require login.",
        details: scrapeError.message
      }, { status: 500 });
    }

  } catch (error) {
    console.error("LinkedIn import error:", error);
    return NextResponse.json(
      { error: "Failed to import LinkedIn profile" },
      { status: 500 }
    );
  }
}
