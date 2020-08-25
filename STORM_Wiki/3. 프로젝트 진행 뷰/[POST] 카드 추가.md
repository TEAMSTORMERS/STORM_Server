## [POST] 카드 추가

<br>
<br>

![메모추가](https://user-images.githubusercontent.com/55133871/87725787-e5d54e80-c7f8-11ea-9abf-77ed93ea9c7c.png)

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| POST   | /card | 카드를 추가한다. |

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
   "user_idx": 1,
   "project_idx": 1,
   "round_idx": 1,
   "card_img": "",
   "card_txt" : "고양이랑 같이 커피를 마실 수 있는 곳!"
}
```
- user_idx: 유저 인덱스
- project_idx: 프로젝트 인덱스
- round_idx: 라운드 인덱스
- card_img: 카드 이미지 (이미지가 존재할 경우 텍스트 null)
- card_txt: 카드 텍스트 (텍스트가 존재할 경우 이미지 null)

<br>
<br>

## Response



<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "카드 추가 성공",
    "data": 11
}
```
+ data : 추가된 card_idx

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