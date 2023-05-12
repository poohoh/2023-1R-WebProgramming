import { useEffect, useState } from 'react';
import p01 from './assets/고윤정.jpg';
import p02 from './assets/김태희.jpg';
import p03 from './assets/김혜수.jpg';
import p04 from './assets/김희선.jpg';
import p05 from './assets/문채원.jpg';
import p06 from './assets/배수지.jpg';
import p07 from './assets/손예진.jpg';
import p08 from './assets/송혜교.jpg';
import p09 from './assets/신민아.jpg';
import p10 from './assets/신세경.jpg';
import p11 from './assets/이영애.jpg';
import p12 from './assets/이주빈.jpg';
import p13 from './assets/전지현.jpg';
import p14 from './assets/하지원.jpg';
import p15 from './assets/한가인.jpg';
import p16 from './assets/한지민.jpg';

function Worldcup() {
    const candidate = [
        {name:'고윤정', src: p01},
        {name:'김태희', src: p02},
        {name:'김혜수', src: p03},
        {name:'김희선', src: p04},
        {name:'문채원', src: p05},
        {name:'배수지', src: p06},
        {name:'손예진', src: p07},
        {name:'송혜교', src: p08},
        {name:'신민아', src: p09},
        {name:'신세경', src: p10},
        {name:'이영애', src: p11},
        {name:'이주빈', src: p12},
        {name:'전지현', src: p13},
        {name:'하지원', src: p14},
        {name:'한가인', src: p15},
        {name:'한지민', src: p16}
    ];

    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);

    useEffect(() => {
        setGame(candidate.map(c => {
            return {name: c.name, src: c.src, order: Math.random()}
        }).sort((l, r) => {
            return l.order - r.order;
        })
        );
    }, []);

    useEffect(() => {
        if (game.length > 1 && round + 1 > game.length / 2) {
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
        
        // 이 부분에 else if로 우승을 리턴하면 안되는 이유?
        
    }, [round]);

    if ( game.length == 1) {
        return <div>
            <p>이상형 월드컵 우승</p>
            <img src={game[0].src} /> <p>{game[0].name}</p>
        </div>
    }    

    if (game.length == 0 || round + 1 > game.length / 2) return <p>로딩중입니다.</p>;
    return <div>
        <p>이상형 월드컵 {round + 1} / {game.length / 2}  <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={game[round * 2].src} onClick={() => {
                setNextGame((prev) => prev.concat(game[round * 2]))
                setRound(round => round + 1);
            }} />
            <img src={game[round * 2 + 1].src} onClick={() => {
                setNextGame((prev) => prev.concat(game[round * 2 + 1]))
                setRound(round => round + 1);
            }}/>
        </div>
    </div>
    
    ;
}

export default Worldcup;