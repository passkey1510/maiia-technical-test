import * as React from "react";

const Pratitioner = () => {
  const [prat, setPrat] = React.useState({});
  React.useEffect(() => {
    setInterval(async () => {
      const data = await fetch('http://localhost:3333/getPractitioner');
      let pratData = await data.json();
      setPrat(pratData.prat)
    }, 1000)
  }, [])
  return (
    <div style={{
      border: '1px solid red'
    }}>
      {prat.firstName} {prat.lastName}
    </div>
  )
}

export default Pratitioner;