## [POST] 카드 스크랩

<br>
<br>

![스크랩](https://user-images.githubusercontent.com/55133871/87726381-defb0b80-c7f9-11ea-8f4b-185994d13681.png)

<br>
<br>


| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| POST   | /card/scrap | 해당 카드를 스크랩한다. |


<br>
<br>

### Request Body

```javascript
{
  "card_idx": INT,
  "user_idx": INT
}
```

* 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
* card_idx : 카드 인덱스
* user_idx : 사용자 인덱스

<br>
<br>

## Response



<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "카드 스크랩 성공"
}
```

<br>
<br>
 ㅤ

<b> < Fail >


1. 통신 실패 

```json
{
    "status": 400,
    "success": false,
    "message": "카드 스크랩 실패"
}
```
