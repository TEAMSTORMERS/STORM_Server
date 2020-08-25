## [POST] 카드 메모 추가

<br>
<br>

![상세보기](https://user-images.githubusercontent.com/55133871/87726504-1b2e6c00-c7fa-11ea-95eb-f8732bcededc.png)

<br>
<br>


| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| POST   | /card/memo | 해당 카드에 메모를 추가한다. |

<br>
<br>


### Request Header

```
{
    "Content-Type": "application/json"
}
```

<br>
<br>


### Request Body
```
{
 "user_idx": INT,
 "card_idx": INT,
 "memo_content" : STRING
}
```
* 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
* user_idx : 사용자 인덱스
* card_idx : 카드 인덱스
* memo_content : 메모 내용


<br>
<br>


### Response
<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "메모 추가 성공"
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
