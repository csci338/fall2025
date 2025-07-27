class Solution(object):
    def canPlaceFlowers(self, flowerbed, n):
        return False


if __name__ == "__main__":
    solution = Solution()
    print(solution.canPlaceFlowers([1, 0, 0, 0, 1], 1))
    print(solution.canPlaceFlowers([1, 0, 0, 0, 0, 0, 1], 2))
    print(solution.canPlaceFlowers([1, 0, 1, 0, 1], 1))
