#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define BASIC   "\033[0m"
#define RED     "\033[31m"
#define GREEN   "\033[32m"
#define YELLOW  "\033[33m"
#define BLUE    "\033[34m"
#define MAGENTA "\033[35m"
#define CYAN    "\033[36m"

const char *COLOR[] = {BASIC, RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN};

/* Clear :
 * 화면을 깔끔하게 지웁니다. */
void Clear() {
    #ifdef _WIN32
        system("cls");
    #else
        printf("\033[H\033[J");
    #endif
}

/* Delay :
 * 일정 시간 대기합니다. */
void Delay(int time) {
	clock_t ct = clock();
	while(ct + 1000 * time > clock());
}

/* PixelView :
 * 매개변수로 배열과 문자를 받고 픽셀을 출력합니다. */
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

/* FlashEffect :
 * 색상이 없는 부분에 플래시 이펙트를 구현합니다. */
void FlashEffect(int Pixel[32][32], char Draw_char[]) {
    for(int i = 0; i < 32; i++) {
        for(int j = 0; j < 32; j++) {
            if(Pixel[i][j] == 0)
                printf("%s", Draw_char);
            else
                printf(" ");
        }
        printf("\n");
    }
}