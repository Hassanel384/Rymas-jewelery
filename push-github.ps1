# Script de publication automatique vers GitHub
Write-Host "Verification de la connexion avec GitHub (rymas-jewelry)..." -ForegroundColor Cyan

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSucces ! Le projet Rymas Jewelry a ete publie sur GitHub." -ForegroundColor Green
    Write-Host "Vous pouvez maintenant le deployer sur Vercel en 1 clic sur https://vercel.com/new" -ForegroundColor Yellow
} else {
    Write-Host "`nAttention : Le repository 'rymas-jewelry' n'est pas encore cree sur votre compte GitHub." -ForegroundColor Red
    Write-Host "1. Ouvrez https://github.com/new" -ForegroundColor Yellow
    Write-Host "2. Nommez le repository : rymas-jewelry" -ForegroundColor Yellow
    Write-Host "3. Cliquez sur 'Create repository'" -ForegroundColor Yellow
    Write-Host "4. Relancez ce script : .\push-github.ps1" -ForegroundColor Yellow
}
