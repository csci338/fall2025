import asyncio


async def coroutine1():
    await asyncio.sleep(3)
    print("Coroutine 1 completed")
    return 6  # fake data to be returned


async def coroutine2():
    await asyncio.sleep(1.5)
    print("Coroutine 2 completed")
    return 9  # fake data to be returned


async def main():
    result1, result2 = await asyncio.gather(coroutine1(), coroutine2())

    # Note that the statements below only execute once both
    # coroutines have executed. This is because of the "await"
    # keyword.
    print(result1)
    print(result2)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()
