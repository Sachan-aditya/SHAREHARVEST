# Use Java 22 base image
FROM openjdk:22

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY target/shareharvest-0.0.1-SNAPSHOT.jar /app/shareharvest-0.0.1-SNAPSHOT.jar

# Expose port 8083
EXPOSE 8083

# Run the application
ENTRYPOINT ["java", "-jar", "shareharvest-0.0.1-SNAPSHOT.jar"]