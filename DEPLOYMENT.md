# Backend Deployment Guide

## Prerequisites
- GitHub account
- Railway account (for MySQL database)
- Render account (for backend hosting)

## Step 1: Deploy MySQL Database on Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click **New Project** → **Deploy MySQL**
3. Once deployed, go to **Variables** tab and note down:
   - `MYSQL_HOST`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`
   - `MYSQL_PORT`
4. Connect to Railway MySQL using a client (MySQL Workbench/phpMyAdmin)
5. Import your database schema and data

## Step 2: Push Code to GitHub

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 3: Deploy Backend on Render

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: your-app-name
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `DB_HOST` = (from Railway)
   - `DB_USER` = (from Railway)
   - `DB_PASSWORD` = (from Railway)
   - `DB_NAME` = (from Railway)
   - `DB_PORT` = (from Railway, usually 3306)
   - `PORT` = 5000
6. Click **Create Web Service**

## Step 4: Update Flutter App

Once deployed, update your Flutter app's API URLs:
- In `home_page.dart` and `order_page.dart`, change:
  ```dart
  final String apiUrl = "http://localhost:5000/products";
  ```
  To:
  ```dart
  final String apiUrl = "https://your-render-app.onrender.com/products";
  ```

## Notes
- Render free tier may sleep after inactivity (takes ~30s to wake up)
- Railway provides $5 free credit monthly
- Make sure to update the image column size in your database (VARCHAR(500) or TEXT)
