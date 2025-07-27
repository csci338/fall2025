import asyncio
import aiohttp


async def fetch_url(url, message):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.text()
            print("Message:", message)
            return data


async def main():
    urls = ["https://openai.com", "https://example.com"]
    tasks = [fetch_url(url, url) for url in urls]

    # delegate execution management to the event loop via the gather method:
    results = await asyncio.gather(*tasks)

    # once all of the coroutines have completed, output the results
    for url, result in zip(urls, results):
        print(f"Fetched {len(result)} bytes from {url}")

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()
