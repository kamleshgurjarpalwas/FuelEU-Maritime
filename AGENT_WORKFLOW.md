# AI Agent Workflow Log

## Agents Used
- **GitHub Copilot** – for inline code suggestions and boilerplate generation.  
- **Cursor** – for structured task execution using `tasks.md`.  
- **ChatGPT (GPT-5)** – for architectural guidance, debugging, and documentation.  
- **DeepSeek** – for quick syntax checks and alternative implementation approaches.

---

## Prompts & Outputs

1. **Prompt:** “Setup a basic Express app in TypeScript.”  
   **Output:** Successfully created a TypeScript-based backend with essential dependencies like `express`, `ts-node-dev`, and `dotenv`.  
   **Result:** Application ran at `http://localhost:4000` with `index.ts` as entry point.

2. **Prompt:** “Create necessary folders in backend like domain, application, ports.”  
   **Output:** Generated modular structure separating concerns between API routes, services, and database logic.  
   **Result:** Clean architecture established to support scalability.

3. **Prompt:** “Create APIs for pool creation, member management, and yearly statistics.”  
   **Output:** ChatGPT generated REST endpoints (POST `/pool`, GET `/pool/:id`, etc.) with validation logic and clear response structure.  
   **Result:** All endpoints tested successfully using Postman.

4. **Prompt:** “Integrate PostgreSQL with Prisma ORM and seed dummy data.”  
   **Output:** Configured `.env` and Prisma schema, created tables and relationships using migration commands.  
   **Result:** Database connected successfully and verified using SQL queries.

5. **Prompt:** “Setup frontend with Vite + React and connect to backend APIs.”  
   **Output:** Successfully fetched and displayed API data using `axios` and environment variables from `.env`.  
   **Result:** End-to-end data flow between frontend and backend verified.

---

## Validation / Corrections
- Verified API responses using **Postman** and **console logs**.  
- Fixed environment variable issue (`VITE_API_BASE` was undefined due to missing `VITE_` prefix recognition in Vite).  
- Adjusted Prisma model fields to match actual JSON request structure.  
- Debugged CORS and JSON parsing issues using AI-guided corrections.  
- Tested frontend rendering using local dev server to confirm correct data binding.

---

## Observations

### Where AI Saved Time
- Code scaffolding for backend and frontend setup was completed within minutes.  
- Automated creation of API routes, Prisma schema, and validation logic.  
- AI provided quick troubleshooting steps for environment and CORS errors.  

### Where It Failed or Hallucinated
- Some suggested commands were outdated or platform-specific (e.g., WSL vs native Windows).  
- Initial Prisma migrations needed manual corrections.  
- AI occasionally generated TypeScript types inconsistent with the actual Prisma model.  

### How Tools Were Combined Effectively
- **ChatGPT** was used for planning architecture and debugging complex errors.  
- **Copilot** auto-completed boilerplate code (controller and route files).  
- **Cursor** managed tasks in an organized `tasks.md` workflow.  
- **DeepSeek** was used for quick syntax validation and performance optimization hints.

---

## Best Practices Followed
- Maintained **modular folder structure** (`domain`, `application`, `ports`).  
- Used **environment variables** via `.env` for flexibility across environments.  
- Documented **API endpoints** with clear naming and consistent REST principles.  
- Used **Git commits** for each major module to maintain version control.  
- Verified all API responses with **Postman** before integrating into frontend.  
- Followed **AI-assisted debugging** workflow: identify → explain → apply fix → validate.

---

## Summary
The AI-assisted workflow significantly reduced development time and improved code organization. Each agent played a unique role — ChatGPT for reasoning, Copilot for rapid code, Cursor for structured execution, and DeepSeek for optimization. Manual validation ensured accuracy and maintained control over generated content, resulting in a clean, maintainable, and functional full-stack project.
