import asyncio
import aiohttp
import json


async def fetch_url(url, message):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.text()
            print("Message:", message)
            return data


async def main():
    urls = [
        "https://www.apitutor.org/yelp/simple/v3/businesses/search?location=Asheville, NC&term=pizza&limit=20",
        "https://www.apitutor.org/yelp/simple/v3/businesses/search?location=Evanston, IL&term=pizza&limit=1"
    ]
    tasks = [fetch_url(url, url) for url in urls]
    results = await asyncio.gather(*tasks)
    for url, result in zip(urls, results):
        data = json.loads(result)
        print(f"Fetched {data} from {url}")

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()
