# Use Java 22 base image
FROM openjdk:22-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY target/shareharvest-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8083
EXPOSE 8083

# Run the application
CMD ["java", "-jar", "app.jar"]