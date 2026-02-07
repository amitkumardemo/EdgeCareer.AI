-- Convert badges array to JSON string with default
-- First drop the default if it exists
ALTER TABLE "User" ALTER COLUMN badges DROP DEFAULT;
-- Convert array to JSON text
ALTER TABLE "User" ALTER COLUMN badges TYPE TEXT USING 
  CASE 
    WHEN badges IS NULL THEN '[]'
    WHEN array_length(badges, 1) IS NULL THEN '[]'
    ELSE array_to_json(badges)::text
  END;
-- Update any remaining NULLs
UPDATE "User" SET badges = '[]' WHERE badges IS NULL;
-- Set new default and NOT NULL
ALTER TABLE "User" ALTER COLUMN badges SET DEFAULT '[]'::text;
ALTER TABLE "User" ALTER COLUMN badges SET NOT NULL;

-- Convert skills array to JSON string with default
-- First drop the default if it exists
ALTER TABLE "User" ALTER COLUMN skills DROP DEFAULT;
-- Convert array to JSON text
ALTER TABLE "User" ALTER COLUMN skills TYPE TEXT USING 
  CASE 
    WHEN skills IS NULL THEN '[]'
    WHEN array_length(skills, 1) IS NULL THEN '[]'
    ELSE array_to_json(skills)::text
  END;
-- Update any remaining NULLs
UPDATE "User" SET skills = '[]' WHERE skills IS NULL;
-- Set new default and NOT NULL
ALTER TABLE "User" ALTER COLUMN skills SET DEFAULT '[]'::text;
ALTER TABLE "User" ALTER COLUMN skills SET NOT NULL;

-- Add missing ATS columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='User' AND column_name='totalResumesAnalyzed') THEN
    ALTER TABLE "User" ADD COLUMN "totalResumesAnalyzed" INTEGER NOT NULL DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='User' AND column_name='bestAtsScore') THEN
    ALTER TABLE "User" ADD COLUMN "bestAtsScore" DOUBLE PRECISION;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='User' AND column_name='lastAtsScore') THEN
    ALTER TABLE "User" ADD COLUMN "lastAtsScore" DOUBLE PRECISION;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='User' AND column_name='atsAnalyses') THEN
    -- atsAnalyses is a relation, handled by ATSAnalysis table
    NULL;
  END IF;
END $$;
