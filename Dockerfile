# Stage 1: Build the Angular application
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:1.25

# Copy the built Angular files from the previous stage to the Nginx web root
COPY --from=build /app/dist/SHMS-frontend /usr/share/nginx/html

# Copy a custom Nginx configuration (optional)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx HTTP port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
#npm run build
#docker run --rm -d --name shms-frontend --network photo-app-network -p 4200:80 shms-frontend
