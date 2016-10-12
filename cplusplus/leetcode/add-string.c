#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *
addStrings (char *num1, char *num2)
{
  int len1 = strlen (num1);
  int len2 = strlen (num2);
  if (len1 > len2)
    {
      return addStrings (num2, num1);
    }
  int j = len2;
  int i = len1;
  while (1)
    {
      if(i < 0) {
          break;
      }
      num2[j] += num1[i] - '0';
      j--;
      i--;
    }
  char tmp[5102];
  tmp[5101] = '\0';
  int up = 0;
  for (j = len2 - 1, i = 5100; j >= 0; j--, i--)
    {
        printf("%d\n", num2[j] + up - '0');
      if (num2[j] + up > '9')
	{
	  tmp[i] = num2[j] + up- 10;
	  up = 1;
	}
      else
	{
	  tmp[i] = num2[j] + up;
	  up = 0;
	}
    }
  if (up == 1)
    {
      tmp[i] = '1';
    }
  else
    {
      i++;
    }
  char *ret = (char *) malloc (sizeof (char) * 5101);
  bzero (ret, sizeof (char) * 5101);
  strncpy (ret, &tmp[i], sizeof (char) * 5101);
  return ret;
}

int
main ()
{
  char num1[] = "1";
  char num2[] = "1";
  printf("%s\n", addStrings(num1, num2));
  return 0;
}
