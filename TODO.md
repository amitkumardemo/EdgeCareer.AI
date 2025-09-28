# TODO: Add Role-Based Interview Features

## Steps to Complete
- [x] Update actions/interview.js: Modify generateQuiz function to accept role and company parameters, update the prompt to include role/company and request 4 coding questions with code snippets.
- [x] Update app/(main)/interview/_components/quiz.jsx: Add input fields for role and company before quiz start, pass parameters to generateQuiz, add display for code snippets in questions.
- [ ] Test the updated quiz: Run dev server, navigate to /interview/mock, input role/company, start quiz, verify questions are tailored and include coding MCQ with snippets.
- [ ] Verify JSON parsing and UI rendering for new question format.

## Notes
- Ensure backward compatibility if role/company not provided.
- Coding questions: MCQ format with code snippet field for display.
- No DB schema changes needed.
