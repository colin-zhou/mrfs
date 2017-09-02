//
// Created by colinzhou on 18/06/2017.
//

#include <iostream>
#include <cstdlib>
#include <vector>

#define CATCH_CONFIG_MAIN
#include "catch.hpp"

using namespace std;


static unsigned int Factorial( unsigned int number ) {
    return number > 1 ? Factorial(number - 1) * number : 1;
}


/**
 * set up and tear down will execute once for each section
 */
TEST_CASE("this is a demo") {
    // set up

    // different sections
    SECTION("test1") {
        REQUIRE( Factorial(0) == 1);
    }
    SECTION("test2") {
        REQUIRE( Factorial(1) == 1);
    }

    // tear down
}

TEST_CASE( "Factorials are computed", "[factorial]" ) {
    REQUIRE( Factorial(2) == 2 );
    REQUIRE( Factorial(3) == 6 );
    REQUIRE( Factorial(10) == 3628800 );
}