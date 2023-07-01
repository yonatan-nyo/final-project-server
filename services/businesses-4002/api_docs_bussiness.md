
## Invest Mate

#### Endpoints



| Method | routes     | Description                       |
| :-------- | :------- | :-------------------------------- |
| GET      | /bussinesses | Membaca semua data entitas utama |
| GET      | /bussinesses/:slug | mencari data entitas utama berdasarkan **slug** |
| POST      | /bussinesses | membuat data entitas utama |

#### GET /bussinesses

#### Response
```https
[
    {
        "_id": "649c3508e097160432a5031c",
        "name": "Flance",
        "slug": "flance",
        "brandUrl": "Flance.com",
        "imagesUrl": [
            "flance1.jp",
            "flance2.jpg"
        ],
        "locations": [
            {
                "lat": 6.2607,
                "lng": 106.7817
            }
        ],
        "pdfUrl": "flance.pdf",
        "fundNeeded": 200000000,
        "fundReceived": [
            20000000,
            15000000
        ],
        "UserId": "649c1fb2e097160432a50318"
    },
    {
        "_id": "649c3f9bcc834c675bd309b6",
        "name": "Flexwell 2.0",
        "slug": "flexwell-20",
        "brandUrl": "flexwell.com",
        "imagesUrl": [
            [
                "flexwell.jpg"
            ]
        ],
        "locations": [
            {
                "lat": 1.2311,
                "lng": 231.13
            }
        ],
        "pdfUrl": "flance.pdf",
        "fundNeeded": 300000000,
        "fundReceived": [
            0
        ],
        "UserId": "649c1fb2e097160432a50318"
    },
    {
        "_id": "649c3ff7dc7849796f5042e7",
        "name": "Flexwell 2.0",
        "slug": "flexwell-20",
        "brandUrl": "flexwell.com",
        "imagesUrl": [
            [
                [
                    "flexwell.jpg",
                    "images2.jpg"
                ]
            ]
        ],
        "locations": [
            {
                "lat": 1.2311,
                "lng": 231.13
            }
        ],
        "pdfUrl": "flance.pdf",
        "fundNeeded": 300000000,
        "fundReceived": [
            0
        ],
        "UserId": "649c1fb2e097160432a50318"
    }
]

```

#### GET /bussinesses/:slug

#### Request
- Params
```
    slug: String
```


#### Response
```
{
    "_id": "649c3508e097160432a5031c",
    "name": "Flance",
    "slug": "flance",
    "brandUrl": "Flance.com",
    "imagesUrl": [
        "flance1.jp",
        "flance2.jpg"
    ],
    "locations": [
        {
            "lat": 6.2607,
            "lng": 106.7817
        }
    ],
    "pdfUrl": "flance.pdf",
    "fundNeeded": 200000000,
    "fundReceived": [
        20000000,
        15000000
    ],
    "UserId": "649c1fb2e097160432a50318"
}
```


#### POST /bussinesses

#### Request
- Body
```
        name: String,
        brandUrl: String,
        imagesUrl: String,
        lat: Integer,
        lng: Integer,
        pdfUrl: String,
        fundNeeded: Integer
```

#### Response
```
{
    "message": "Created",
    "name": "Flexwell 2.0",
    "slug": "flexwell-20",
    "brandUrl": "flexwell.com",
    "imagesUrl": [
        [
            "flexwell.jpg",
            "images2.jpg"
        ]
    ],
    "locations": [
        {
            "lat": 1.2311,
            "lng": 231.13
        }
    ],
    "pdfUrl": "flance.pdf",
    "fundNeeded": 300000000,
    "fundReceived": [
        0
    ],
    "UserId": "649c1fb2e097160432a50318"
}
```