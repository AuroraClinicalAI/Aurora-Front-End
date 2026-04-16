# Build stage
FROM node:20-alpine AS build-stage

WORKDIR /app

RUN corepack enable pnpm
# Add build arguments for environment variables
ARG VITE_BASE_URL
ARG VITE_SUPPORT_EMAIL

# Set them as environment variables during build
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_SUPPORT_EMAIL=$VITE_SUPPORT_EMAIL

# Copy package files and install dependencies
COPY package*.json ./
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:stable-alpine AS production-stage

# Copy built files from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
