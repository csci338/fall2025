def run_all_tests(all_tests):

    print('-' * 50)

    successes = 0
    for test in all_tests:
        successes += test()

    print('-' * 50)
    if successes == len(all_tests):
        print('\n🎉 Horray! All {0} tests pass!\n'.format(successes))
    else:
        print(
            "\n😬 Only ",
            successes,
            "out of",
            len(all_tests),
            "tests passed.\n"
        )


def assert_print(condition, message):
    if condition:
        print('✅ Success:', message)
        return True
    else:
        print('❌ Failure:', message)
        return False
