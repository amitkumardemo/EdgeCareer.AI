const fs = require('fs');

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

if (!schema.includes('ProgramTaskTemplate')) {
  // Add taskTemplates relation to InternshipProgram
  schema = schema.replace(
    '  batches     InternshipBatch[]\n',
    '  batches     InternshipBatch[]\n  taskTemplates ProgramTaskTemplate[]\n'
  );

  // Add ProgramTaskTemplate model before InternshipBatch
  const templateModel = `
model ProgramTaskTemplate {
  id          String            @id @default(uuid())
  programId   String
  title       String
  description String
  weekNumber  Int               @default(1)
  maxScore    Float             @default(100)
  resources   String?
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
  program     InternshipProgram @relation(fields: [programId], references: [id], onDelete: Cascade)

  @@index([programId])
}
`;
  schema = schema.replace('model InternshipBatch {', templateModel + '\nmodel InternshipBatch {');
}

if (!schema.includes('CertificatePayment')) {
  // Add payment relation to InternshipCertificate
  schema = schema.replace(
    '  progress      InternProgress @relation(fields: [progressId], references: [id], onDelete: Cascade)\n',
    '  progress      InternProgress @relation(fields: [progressId], references: [id], onDelete: Cascade)\n  payment       CertificatePayment?\n'
  );

  // Add CertificatePayment model after InternshipCertificate
  const paymentModel = `
model CertificatePayment {
  id              String                @id @default(uuid())
  certificateId   String                @unique
  amount          Float
  currency        String                @default("INR")
  status          PaymentStatus         @default(PENDING)
  razorpayOrderId String?               @unique
  razorpayPaymentId String?             @unique
  createdAt       DateTime              @default(now())
  updatedAt       DateTime              @updatedAt
  certificate     InternshipCertificate @relation(fields: [certificateId], references: [id], onDelete: Cascade)
  
  @@index([status])
}
`;
  schema = schema.replace('model InternshipReport {', paymentModel + '\nmodel InternshipReport {');
}

if (!schema.includes('PaymentStatus')) {
  const paymentStatusEnum = `
enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
}
`;
  schema = schema + paymentStatusEnum;
}

fs.writeFileSync('prisma/schema.prisma', schema, 'utf8');
console.log('Schema patched successfully!');
