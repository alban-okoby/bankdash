# 💳 Bankdash – Admin Dashboard UI Kit

> Designed by [Seju](https://www.figma.com/@sejal_ui_ux)  
> Implemented by [Alban Okoby](http://github.com/alban-okoby)

---

## 📁 Project Structure

Here’s the folder structure of the application:

![Project Structure](https://github.com/alban-okoby/bankdash/blob/main/screens/structure.PNG)

---

## 🚀 How to Run BankDash

### 🔧 Prerequisites

Make sure the following are installed on your machine:

- [Docker](https://www.docker.com/) & Docker Compose *(for one-command setup)*  
  **OR**  
- [Node.js](https://nodejs.org/) (^18.19.1 || ^20.11.1 || ^22.0.0)
- `npm`
- `git` *(optional)*

---

## 📥 Clone the Repository

If you have Git installed, run:

```bash
git clone https://github.com/alban-okoby/bankdash.git
```

If Git is **not** installed on your machine, click the **"Code"** button on the GitHub page, download the project as a ZIP file, extract it, then navigate to the project folder:

```
cd bankdash
```

### 🐳 Steps to Run the Application
#### Start with Docker Compose (required tools will be installed)
The first step is to build Docker images for all services defined in the compose.yml file.
From your terminal, at the root of the project, run:

```
docker compose up
```
or

```
docker-compose up
```
    
#### 🔧 Run with npm or [Angular CLI](https://angular.dev/installation)
1) Install Angular CLI:

```
npm install -g @angular/cli@18
```
Puis 
2) Then install dependencies and start the application:
```
npm install && npm start
```
This will start all services defined in the **compose.yml** file.


### 🌐 Access the Application
Open your browser and go to: [http://localhost:4200](http://localhost:4200)

A default user is automatically added so you can access the main dashboard:
- Email: preview@bankdash.com
- Password: pass@1234


###### Login Page
<img src="https://github.com/alban-okoby/bankcash/blob/main/screens/login_page.png" />


###### Main Page 
<img src="https://github.com/alban-okoby/bankdash/blob/main/screens/dash.png" />


### 🛑 Stop and Remove Containers
When you're done, stop the container using:
```
docker-compose down
```
Or, if running with npm / Angular CLI:
```
Ctrl + C
```
