# URL Shortener API

This is a scalable URL shortener API with advanced analytics, user authentication via Google Sign-In, and rate limiting.

## Features

- User authentication with Google Sign-In
- Create short URLs with optional custom aliases and topics
- Redirect short URLs to their original long URLs
- Detailed analytics for individual URLs, topics, and overall usage
- Rate limiting to prevent abuse
- Caching with Redis for improved performance

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Redis
- Docker

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- Google OAuth 2.0 Client ID

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/urlShorterApi.git
   cd urlShorterApi
   ```

2. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/urlshortener
   REDIS_URL=redis://localhost:6379
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   BASE_URL=http://localhost:3000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

5. Start the application:
   ```bash
   npm run start
   ```

The API will be available at `http://localhost:3000`.

## API Documentation

### Authentication

```http
POST /auth/google
```
Authenticate with Google Sign-In.

### URL Operations

```http
POST /api/urls
```
Create a new short URL.

**Request Body:**
```json
{
  "longUrl": "https://example.com/very/long/url",
  "alias": "custom-name",   // optional
  "topic": "technology"     // optional
}
```

```http
GET /api/:shortCode
```
Redirect to the original URL.

```http
GET /api/urls/stats/:shortCode
```
Get analytics for a specific URL.

## Analytics

The API provides detailed analytics including:
- Click counts
- Geographic distribution
- Referral sources
- Time-based statistics
- Device and browser information

## Rate Limiting

API requests are limited to:
- 100 URL creations per hour per user
- 1000 redirects per hour per IP

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
Krishna Email: krishnasss365@gmail.com

Project Link: [https://github.com/krishna11118/urlShorterApi](https://github.com/krishna11118/urlShorterApi)
