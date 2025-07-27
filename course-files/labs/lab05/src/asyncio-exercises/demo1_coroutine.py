import asyncio


async def my_coroutine():
    print("Hello, asyncio!")

# To run a coroutine, you need an event loop.
loop = asyncio.get_event_loop()
loop.run_until_complete(my_coroutine())
loop.close()
