<div align="center">

<br>

<img src="./res/logo.png" width="500px">

<br>

### **32x32 픽셀을 C언어 배열로 변환할 수 있는 툴**

</div>

---

### 조작키 및 버튼
- **`왼클릭`** : 픽셀을 그리거나 지웁니다.
- **`우클릭`** : 픽셀의 색상을 변경합니다.
- **`LOAD`** : 복사된 픽셀 데이터를 가져옵니다.
- **`COPY`** : 그려진 픽셀 데이터를 복사합니다.
- **`REVERT`** : 하얀색과 검정색으로 서로 반전합니다.
- **`RESET`** : 모든 픽셀을 지웁니다.

<br>

---

### 예제 코드
```c
#include "PixelArray.h"

int main() {
    int arr[32][32] = {...};    // 이 곳에 복사한 배열을 삽입합니다.

    PixelView(arr, '■');        // 매개변수로 배열과 문자를 받고 출력합니다.

    return 0;
}
```