import React, { useEffect } from "react";
var interval;
class Timer extends React.Component{
    constructor(){
        super();
        this.state = {
            secound : 0,
            minute : 0,
            hour : 0,
            isstart : false,
            Light:false,
            record : ["00 : 00 : 02" , "00 : 50 : 22"]
        }
    }

    render(){
        const StartTimer = ()=>{
            if(this.state.isstart === false){
                interval = setInterval(() => {
                    this.setState({
                        secound : this.state.secound + 1
                    })
                }, 1000);
                this.setState({
                    isstart:true
                })
            }
        }
        const StopTimer = ()=>{
            clearInterval(interval)
            this.setState({
                isstart : false
            })
        }    
        const ResetTimer = ()=>{
            clearInterval(interval)
            this.setState({
                secound : 0,
                minute : 0,
                hour:0,
                isstart:false
            })
        }
        if(this.state.secound === 60){
            this.setState({
                secound:0,
                minute:this.state.minute + 1
            })
        }
        if(this.state.minute === 60){
            this.setState({
                minute:0,
                hour:this.state.hour + 1
            })
        }

        let s = this.state.secound;
        let m = this.state.minute;
        let h = this.state.hour;
        const SaveTimer = ()=>{
            const newtime = `${h>9?h:"0"+h} : ${m>9?m:"0"+m} : ${s>9?s:"0"+s}`
            this.setState({
                record : [...this.state.record , newtime]
            })
        }

        const HandleDeleteTimeArr = (e)=>{
            this.setState({
                record:this.state.record.filter(t=> t !== e.target.innerHTML)
            })
        }
        const lightTimer = ()=>{
            this.setState({
                Light : !this.state.Light
            })
            const body = document.querySelector("body");
            this.state.Light ? body.style.background = "cadetblue" : body.style.background = "black"
        }

        return(
            <div className="container">
            <div>
                <div className="box-text">
                    <h1>please Start The Timer</h1>
                </div>
                <div className="box-timer">
                <h1>{`${h>9?h:"0"+h} : ${m>9?m:"0"+m} : ${s>9?s:"0"+s}`}</h1>
                <div className="buttons">
                    <button type="submit" className="button-start-timer" onClick={StartTimer}>Start</button>
                    <button type="submit" className="button-stop-timer" onClick={StopTimer}>Stop</button>
                    <button type="submit" className="button-reset-timer" onClick={ResetTimer}>Reset</button>
                    <button type="submit" className="button-save-timer" onClick={SaveTimer}>Record</button>
                    <button type="submit" className="button-light-timer" style={this.state.Light ? {background:"black",color:"white"} : {background:"white",color:"black"}} onClick={lightTimer}>{this.state.Light ? "light" : "dark"}</button>
                </div>
                </div>
            </div>
            <div className="box-save-timer">
                {
                    this.state.record.map(t=>(
                        <h3 onClick={(e)=>HandleDeleteTimeArr(e)} className="TimeArr" key={Math.random()}>{t}</h3>
                    ))
                }
            </div>
        </div>

            
        )
    }
}
export default Timer;