## [DELETE] 카드 스크랩 취소

<br>
<br>

![스크랩](https://user-images.githubusercontent.com/55133871/87726381-defb0b80-c7f9-11ea-8f4b-185994d13681.png)

<br>
<br>


| Method | URL                    | 기능                          |
| ------ | ----------------------- | ----------------------------- |
| DELETE | /card/scrap/:user_idx/:card_idx | 해당 카드 스크랩을 취소한다. |

<br>
<br>

### Request Query

| key       | 설명        | 타입 | 비고     |
| --------- | ----------- | ---- | -------- |
| :user_idx | 유저 인덱스 | INT  | NOT NULL |
| :card_idx | 카드 인덱스 | INT  | NOT NULL |


<br>
<br>


## Response



<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "카드 스크랩 취소 성공"
}
```

<br> ㅤ

<b> < Fail >


1. 데이터 누락

```json
{
    "status": 400,
    "success": false,
    "message": "필요한 값이 없습니다."
}
```

