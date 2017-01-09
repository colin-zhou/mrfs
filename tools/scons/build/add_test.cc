#include "gtest/gtest.h"
#include "add.h"

extern "C" {
#include "add.h"
}

namespace unit_test {
#include "add.c"

TEST(AddTest, onePlusTwoGivesThree){
    EXPECT_EQ(3, add(1,2));
}
}

int 
main(int argc, char **argv)
{
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
