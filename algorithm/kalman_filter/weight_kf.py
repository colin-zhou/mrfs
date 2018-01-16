#!/bin/python3.5


import numpy as np
import matplotlib as mpl
import matplotlib.pyplot as plt


def g_h_filter(data, x0, dx, g, h, dt=1.0, pred=None):
    x = x0
    results = []
    # the observe data
    for z in data:
        x_predict = x + dx * dt
        if pred is not None:
            pred.append(x_predict)
        residual = z - x_predict
        dx = dx + h * (residual) / dt
        x = x_predict + g*residual
        results.append(x)
    return np.array(results)


weights = np.array([158.0, 164.2, 160.3, 159.9, 162.1, 164.6,
                    169.6, 167.4, 166.4, 171.0, 171.2, 172.6])

data = g_h_filter(data = weights, x0=160, dx=1, g=3.0/10, h = 1.0/3, dt=1.0)

print(data)
print(weights)

idxs = range(0, len(weights))
plt.plot(idxs, data)

