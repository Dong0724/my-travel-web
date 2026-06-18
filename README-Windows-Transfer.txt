My Travel Web - Windows 10 / Windows 11 transfer note

For complete migration and redeployment instructions, read:
MIGRATION-WINDOWS.md

Quick start on a new computer:
1. Unzip the complete package.
2. Open PowerShell in the project folder.
3. Run:
   powershell -ExecutionPolicy Bypass -File .\setup-new-windows.ps1
4. Log in to GitHub and Cloudflare when prompted.
5. Run:
   .\deploy-all.ps1 -Message "Redeploy from new Windows computer"

Local preview:
- Double-click start-server.bat
- Open http://127.0.0.1:4173/

Security:
- The package does not include tokens, passwords, .env files, or login credentials.
- The hidden .git folder is included so Git history and the GitHub remote can be restored.
