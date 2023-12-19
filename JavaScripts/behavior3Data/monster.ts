export const Behavoir3_monster = {
  "name": "monster",
  "root": {
    "id": 1,
    "name": "Sequence",
    "desc": "怪物测试AI",
    "args": {},
    "children": [
      {
        "id": 2,
        "name": "GetHp",
        "args": {},
        "output": [
          "hp"
        ],
        "debug": true
      },
      {
        "id": 3,
        "name": "IfElse",
        "args": {},
        "debug": true,
        "children": [
          {
            "id": 4,
            "name": "Cmp",
            "args": {
              "gt": 50
            },
            "input": [
              "hp"
            ],
            "debug": false
          },
          {
            "id": 5,
            "name": "Sequence",
            "args": {},
            "debug": false,
            "children": [
              {
                "id": 6,
                "name": "Log",
                "desc": "攻击",
                "args": {
                  "str": "Attack!"
                }
              },
              {
                "id": 7,
                "name": "Wait",
                "args": {
                  "time": 5
                }
              }
            ]
          },
          {
            "id": 8,
            "name": "Log",
            "desc": "逃跑",
            "args": {
              "str": "Run!"
            },
            "children": []
          }
        ]
      },
      {
        "id": 9,
        "name": "Log",
        "desc": "test",
        "args": {
          "str": "if true"
        },
        "children": []
      }
    ]
  },
  "desc": "怪物测试AI是"
}