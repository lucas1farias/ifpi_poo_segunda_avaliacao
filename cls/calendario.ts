



export class Calendario {
    
    obterIdadeData(dateData: string): number {
        const today: Date = new Date()
        const anotherDate: Date = new Date(dateData)
        const difference: number = (today.getTime() - anotherDate.getTime())
        const days: number = difference / (1000 * 60 * 60 * 24)
        return Math.floor(days)
    }
    
    converterMesParaTexto(dateData: string): string {
        let dateAsArray: string[] = dateData.split("-")
        let month: string | number = dateAsArray[1]
        
        if (month[0] === "0") {
            month = Number(month).toString()
        }
        
        month === "1" ? month = "janeiro" : null
        month === "2" ? month = "fevereiro" : null
        month === "3" ? month = "março" : null
        month === "4" ? month = "abril" : null
        month === "5" ? month = "maio" : null
        month === "6" ? month = "junho" : null
        month === "7" ? month = "julho" : null
        month === "8" ? month = "agosto" : null
        month === "9" ? month = "setembro" : null
        month === "10" ? month = "outubro" : null
        month === "11" ? month = "novembro" : null
        month === "12" ? month = "dezembro" : null
        
        const dateShaped: string = `${dateAsArray[2]} de ${month} de ${dateAsArray[0]}`.toString()

        return dateShaped
    }
}

