# -*- coding: utf-8 -*-

import multiprocessing


def test_func():
    raise RuntimeError("hahah error")


def main():
    p = multiprocessing.Pool(2)
    results = []
    for i in range(2):
        r = p.apply_async(test_func)
        results.append(r)
    for r in results:
        r.get()
    p.close()
    p.join()


if __name__ == "__main__":
    main()
