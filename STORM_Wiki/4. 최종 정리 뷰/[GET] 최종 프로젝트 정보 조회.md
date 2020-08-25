## [GET] 최종 프로젝트 정보 조회

<br>
<br>

![최종](https://user-images.githubusercontent.com/55133871/87727013-1f0ebe00-c7fb-11ea-8c48-3ce9a4d3286f.png)

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| GET    | project/finalInfo/:project_idx | 프로젝트가 끝난 후 해당 프로젝트의 정보를 받아오기 |

<br>
<br>


### Request Query

| key          | 설명            | 타입 | 비고     |
| ------------ | --------------- | ---- | -------- |
| :project_idx | 프로젝트 인덱스 | INT  | NOT NULL |

<br>
<br>

## Response



<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "최종 정리 뷰 라운드 별 정보 출력 성공",
    "data": {
        "project_name": "테스트 프로젝트",
        "project_date": "2020.07.15",
        "round_count": 2,
        "project_participants_list": [
            "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/874512364584656.png",
            "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/5789465316487945.png"
        ]
    }
}
```
+ project_name: 프로젝트 제목
+ project_date: 프로젝트 진행 날짜
+ round_count: 진행한 총 라운드 수
+ project_participants_list: 프로젝트 참여 유저 이미지 리스트

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