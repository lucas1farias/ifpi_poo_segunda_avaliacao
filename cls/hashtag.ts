



export class Hashtag {
    private _hashBox: string[]
    private _uniqueHashBox: string[]
    private _countageReport: [string, number][] = []
    
    constructor(hashBox: string[]) {
        this._hashBox = hashBox
        this._uniqueHashBox = []
        this._countageReport = []
    }

    get hashBox(): string[] {
        return this._hashBox
    }

    set hashBox(newValue) {
        this._hashBox = newValue
    }

    get uniqueHashBox(): string[] {
        return this._uniqueHashBox
    }

    set uniqueHashBox(newValue) {
        this._uniqueHashBox = newValue
    }

    get countageReport(): [string, number][] {
        return this._countageReport
    }

    filtrarHashtagsUnicas(): string[] {
        this.uniqueHashBox = this.hashBox.filter((i: string, pos: number, array: string[]) => {
            if (array.indexOf(i) === pos) {
                return true
            }
        })
        return this.uniqueHashBox
    }

    contarCadaHashtag(): [string, number][] {
        const report: [string, number][] = [];
      
        this.uniqueHashBox.forEach((i, pos) => {
            report[pos] = [i, 0]
        })
    
        this.hashBox.forEach((i) => {
            if (this.uniqueHashBox.includes(i)) {
                report[this.uniqueHashBox.indexOf(i)][1]++
            }
        })
        
        return report
    }
    
    ordenarCrescente(): [string, number][] {
        const hashtagsSortedAscending: [string, number][] = this.contarCadaHashtag().sort((i: [string, number], i2: [string, number]) => {
            if (i2[1] < i[1]) {
                return -1  
            } else if (i2[1] > i[1]) {
                return 1  
            } else {
                return 0   
            }
        })
        return hashtagsSortedAscending
    }
}

