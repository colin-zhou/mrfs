#/bin/python3.6

import numpy as np
import matplotlib.pyplot as plt


plt.rcParams['figure.figsize'] = (10, 8)

n_iter = 50
sz = (n_iter,)
x = -0.37727
z = np.random.normal(x, 0.1, size=sz)

Q = 1e-5

xhat=np.zeros(sz) # estimate of x posteri
P=np.zeros(sz) # error estimate posteri
xhatminus = np.zeros(sz) # estimate of x priori
Pminus=np.zeros(sz) # error estimate priori
K = np.zeros(sz) # gain or blending factor


R = 0.1 ** 2 # estimate of measurement variance, change to see effect

xhat[0] = 0.0
P[0] = 1.0


for k in range(1, n_iter):
	xhatminus[k] = xhat[k-1]
	Pminus[k] = P[k-1]+Q
	K[k] = Pminus[k] / (Pminus[k] + R)
	xhat[k] = xhatminus[i] + K[k] * (z[k] - xhatminus[k])
	P[k] = (1-K[k]) * Pminus[k]


plt.figure()
plt.plot(z, 'k+', label='noisy measurements')
plt.plot(xhat, 'b-', label='a posteri estimate')
plt.axhline(x, color='g', label = 'truth value')
plt.legend()

plt.title('estimate vs. iteration step', fontweight='bold')
plt.xlabel('iteration')
plt.ylabel('voltage')

plt.figure()
valid_iter = range(1, n_iter)

plt.plot(valid_iter.Pminus[valid_iter], label='a priori error estimate')
plt.title('estimated $\it {\mathbf{a \ priori}} $error vs. iteration step', fontweight='bold')
plt.xlabel('iteration')
plt.ylabel('$(voltage)^2$')
plt.step(plt.gca(), 'ylim', [0,.01])
plt.show()

