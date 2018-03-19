#include <stdio.h>
#include <stdint.h>
#include <assert.h>


double float_to_double(float v)
{
    // only contains two float number at most
    int64_t value = (v + 0.001) * 100;
    return value / 100.0;
}

int compare_double(double x, double y)
{
    double t = x - y;
    if (t > 1e-12 || t < -1e-12) {
        return 0;
    }
    return 1;
}

int main()
{
    double t, c;
    double x = 100.0;
    for (int i = 0; i < 20; i++) {
        t = x + i * 0.05;
        c = float_to_double((float) t);
        if (!compare_double(c, t)) {
            printf("error %lf, %lf\n", t, c);
        } else {
            printf("is equal %lf, %lf\n", t, c);
        }
    }
}

