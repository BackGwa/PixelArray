#include <stdio.h>

#define BASIC   "\033[0m"
#define RED     "\033[31m"
#define GREEN   "\033[32m"
#define YELLOW  "\033[33m"
#define BLUE    "\033[34m"
#define MAGENTA "\033[35m"
#define CYAN    "\033[36m"

const char *COLOR[] = {BASIC, RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN};

/* PixelView :
 * 매개변수로 받은 변수를 출력합니다. */
void PixelView(int Pixel[32][32], char Draw_char[]) {
    for(int i = 0; i < 32; i++) {
        for(int j = 0; j < 32; j++) {
            if(Pixel[i][j] >= 1)
                printf("%s%s%s", COLOR[Pixel[i][j] - 1], Draw_char, BASIC);
            else
                printf(" ");
        }
        printf("\n");
    }
}