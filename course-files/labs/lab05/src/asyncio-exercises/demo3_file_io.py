import asyncio
import aiofiles


async def read_file(filename):
    async with aiofiles.open(filename, 'r') as file:
        content = await file.read()
        print(f"Read {len(content)} characters from {filename}")
        print(content)

loop = asyncio.get_event_loop()
loop.run_until_complete(read_file('example.txt'))
loop.close()
