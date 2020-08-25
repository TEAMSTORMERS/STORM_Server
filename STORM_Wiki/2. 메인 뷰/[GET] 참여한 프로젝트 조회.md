## [GET] 참여한 프로젝트 조회

<br>
<br>

![참여한프로젝트](https://user-images.githubusercontent.com/55133871/87723718-2df27200-c7f5-11ea-9e20-36f0a2162c6a.png)

<br>
<br>

| Method |     URL      |                    기능                    |
| :----: | :-----------: | :-----------------------------------------: |
|  GET   | /project/user/:user_idx | 해당 유저가 참여한 프로젝트의 목록 보여주기 |

<br>
<br>


### Request Query

| key       | 설명             | 타입 | 비고     |
| --------- | ---------------- | ---- | -------- |
| :user_idx | 각 유저의 idx 값 | INT  | NOT NULL |

<br>
<br>

### Response

<br>

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "참여한 프로젝트의 리스트 조회 성공",
    "data": [
        {
            "project_idx": 1,
            "project_name": "프로젝트1",
            "card_list": [
                {
                    "card_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/213546798.png",
                    "card_txt": null
                },
                {
                    "card_img": null,
                    "card_txt": "카드에 메모도 적을 수 있지요"
                }
            ]
        },
        {
            "project_idx": 2,
            "project_name": "프로젝트2",
            "card_list": [
                {
                    "card_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/86451235.png",
                    "card_txt": null
                },
                {
                    "card_img": null,
                    "card_txt": "메모를 적으면 이미지가 null이다!"
                }
            ]
        }
    ]
}
```
- project_idx: 프로젝트 인덱스
- project_name: 프로젝트 이름
- card_img: 해당 프로젝트의 카드 이미지
- card_txt: 해당 프로젝트의 카드 텍스트

<br>

<b>< Fail >

1. 데이터 누락

```
{
  "status": 400,
  "success": false,
  "message": "필요한 값이 없습니다"
}
```

2. 서버 에러

```
{
  "status": 500,
  "success": false,
  "message": "서버 에러"
}
```