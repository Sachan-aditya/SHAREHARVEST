# Build Stage
FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Package Stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Expose port from Railway
EXPOSE 8083

# Use dynamic port assignment from Railway
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT}"]
