#include "gtest/gtest.h"
#include "my.h"

TEST(MYTEST, TRUE) {
    EXPECT_EQ(myrandom(), 1);
    EXPECT_EQ(myrandom(), 0);
    EXPECT_EQ(myrandom(), 1);
}

TEST(MYTEST, FALSE) {
    EXPECT_EQ(myrandom(), 0);
    EXPECT_EQ(myrandom(), 0);
    EXPECT_EQ(myrandom(), 0);
}
