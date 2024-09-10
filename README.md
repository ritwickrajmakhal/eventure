<h1 align="center">
	EVENTURE
	<br>
</h1>

<div align="center">
    <a href="https://eventure-ten.vercel.app/"><img src="https://img.shields.io/website?url=https://eventure-ten.vercel.app/" alt="Eventure Website"></a>
</div>

## Installation <a name="Installation"></a>

1. Clone the repository

```bash
git clone https://github.com/ritwickrajmakhal/eventure.git
```

2. Install the dependencies

```bash
npm install
```
4. Create a `.env.local` file and paste the bellow contents

```
NEXT_PUBLIC_CHATBOT_SECRET_KEY=your_chatbot_api_key_from_azure_bot_service
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secrate
GOOGLE_ID=your_google_oauth_app_id
GOOGLE_SECRET=your_google_oauth_app_secrate
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=any_random_string
NEXT_PUBLIC_API_URL=strapi_api_url
```

3. Start the development server

```bash
npm run dev
```

### Current contributors <a name="Current contributors"></a>

<a href="https://github.com/ritwickrajmakhal/eventure/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=ritwickrajmakhal/eventure" />
</a>

Made with [contributors-img](https://contributors-img.web.app).
