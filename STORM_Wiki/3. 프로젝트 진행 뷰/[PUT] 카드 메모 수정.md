## [PUT] 카드 메모 수정

<br>
<br>

![상세보기](https://user-images.githubusercontent.com/55133871/87726504-1b2e6c00-c7fa-11ea-95eb-f8732bcededc.png)

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| PUT    | /card/memo | 유저가 입력한 메모를 수정한다. |

<br>
<br>


### Request Body

```
{
   "user_idx": INT,
   "card_idx": INT,
   "memo_content": STRING
}
```


<br>
<br>


### Response



<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "메모 수정 성공"
}
```

<br>


<b> < Fail >


1. 데이터 누락 

```json
{
    "status": 400,
    "success": false,
    "message": "필요한 값이 없습니다."
}
```