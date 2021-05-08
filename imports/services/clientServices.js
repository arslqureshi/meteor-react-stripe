
export const getStateCollection = () => ([
    { id: 'AL', title: 'Alabama', stTax: 'Y' },
    { id: 'AK', title: 'Alaska', stTax: 'N' },
    { id: 'AZ', title: 'Arizona', stTax: 'Y' },
    { id: 'AR', title: 'Arkansas', stTax: 'Y' },
    { id: 'CA', title: 'California', stTax: 'Y' },
    { id: 'CO', title: 'Colorado', stTax: 'Y' },
    { id: 'CT', title: 'Connecticut', stTax: 'Y' },
    { id: 'DE', title: 'Delaware', stTax: 'Y' },
    { id: 'DC', title: 'Dist of Columbia', stTax: 'Y' },
    { id: 'FL', title: 'Florida', stTax: 'N' },
    { id: 'GA', title: 'Georgia', stTax: 'Y' },
    { id: 'HI', title: 'Hawaii', stTax: 'Y' },
    { id: 'ID', title: 'Idaho', stTax: 'Y' },
    { id: 'IL', title: 'Illinois', stTax: 'Y' },
    { id: 'IN', title: 'Indiana', stTax: 'Y' },
    { id: 'IA', title: 'Iowa', stTax: 'Y' },
    { id: 'KS', title: 'Kansas', stTax: 'Y' },
    { id: 'KY', title: 'Kentucky', stTax: 'Y' },
    { id: 'LA', title: 'Louisiana', stTax: 'Y' },
    { id: 'ME', title: 'Maine', stTax: 'Y' },
    { id: 'MD', title: 'Maryland', stTax: 'Y' },
    { id: 'MA', title: 'Massachusetts', stTax: 'Y' },
    { id: 'MI', title: 'Michigan', stTax: 'Y' },
    { id: 'MN', title: 'Minnesota', stTax: 'Y' },
    { id: 'MS', title: 'Mississippi', stTax: 'Y' },
    { id: 'MO', title: 'Missouri', stTax: 'Y' },
    { id: 'MT', title: 'Montana', stTax: 'Y' },
    { id: 'NE', title: 'Nebraska', stTax: 'Y' },
    { id: 'NV', title: 'Nevada', stTax: 'N' },
    { id: 'NH', title: 'New Hampshire', stTax: 'N' },
    { id: 'NJ', title: 'New Jersey', stTax: 'Y' },
    { id: 'NM', title: 'New Mexico', stTax: 'Y' },
    { id: 'NY', title: 'New York', stTax: 'Y' },
    { id: 'NC', title: 'North Carolina', stTax: 'Y' },
    { id: 'ND', title: 'North Dakota', stTax: 'Y' },
    { id: 'OH', title: 'Ohio', stTax: 'Y' },
    { id: 'OK', title: 'Oklahoma', stTax: 'Y' },
    { id: 'OR', title: 'Oregon', stTax: 'Y' },
    { id: 'PA', title: 'Pennsylvania', stTax: 'Y' },
    { id: 'RI', title: 'Rhode Island', stTax: 'Y' },
    { id: 'SC', title: 'South Carolina', stTax: 'Y' },
    { id: 'SD', title: 'South Dakota', stTax: 'N' },
    { id: 'TN', title: 'Tennessee', stTax: 'N' },
    { id: 'TX', title: 'Texas', stTax: 'N' },
    { id: 'UT', title: 'Utah', stTax: 'Y' },
    { id: 'VT', title: 'Vermont', stTax: 'Y' },
    { id: 'VA', title: 'Virginia', stTax: 'Y' },
    { id: 'WA', title: 'Washington', stTax: 'N' },
    { id: 'WV', title: 'West Virginia', stTax: 'Y' },
    { id: 'WI', title: 'Wisconsin', stTax: 'Y' },
    { id: 'WY', title: 'Wyoming', stTax: 'N' }
])
const KEYS = {
    clients: 'clients',
    Cl_ID:'Cl_ID'
}

export function insertClient(data) {
    let clients=getAllClients();
    data['Cl_ID'] = generateCl_ID()
    clients.push(data)
    localStorage.setItem(KEYS.clients, JSON.stringify(clients))
}

export function updateClient(data) {
    let clients=getAllClients();
    let recordIndex = clients.findIndex(x => x.Cl_ID === data.Cl_ID)
    clients[recordIndex] = { ...data }
    localStorage.setItem(KEYS.clients, JSON.stringify(clients))
}

export function generateCl_ID() {
    if (localStorage.getItem(KEYS.Cl_ID) == null)
        localStorage.setItem(KEYS.Cl_ID, '0')
    var id = parseInt(localStorage.getItem(KEYS.Cl_ID))
    localStorage.setItem(KEYS.Cl_ID, (++id).toString())
    return id;
}

export function getAllClients() {
    if (localStorage.getItem(KEYS.clients) == null)
        localStorage.setItem(KEYS.clients, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.clients));
}

export function deleteClient(Cl_ID) {
    let clients = getAllClients();
    clients = clients.filter(x => x.Cl_ID !== Cl_ID);
    localStorage.setItem(KEYS.clients, JSON.stringify(clients));
}

const pKEYS = {
    plans: 'plans',
    Pl_ID:'Pl_ID'
    }

export function insertPlan(data) {
    let plans=getAllPlans();
    data['Pl_ID'] = generatePlan_ID()
    plans.push(data)
    localStorage.setItem(pKEYS.plans, JSON.stringify(plans))
}

export function updatePlan(data) {
    let plans=getAllPlans();
    let recordIndex = plans.findIndex(x => x.Pl_ID === data.Pl_ID)
    plans[recordIndex] = { ...data }
    localStorage.setItem(pKEYS.plans, JSON.stringify(plans))
}

export function generatePlan_ID() {
    if (localStorage.getItem(pKEYS.Pl_ID) == null)
        localStorage.setItem(pKEYS.Pl_ID, '0')
    var id = parseInt(localStorage.getItem(pKEYS.Pl_ID))
    localStorage.setItem(pKEYS.Pl_ID, (++id).toString())
    return id;
}
export function getAllPlans() {
    if (localStorage.getItem(pKEYS.plans) == null)
        localStorage.setItem(pKEYS.plans, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(pKEYS.plans));
}

export function deletePlan(Pl_ID) {
    let plans = getAllPlans();
    plans = plans.filter(x => x.Pl_ID !== Pl_ID);
    localStorage.setItem(pKEYS.plans, JSON.stringify(plans));
}
const iKEYS = {
    incomes: 'incomes',
    Income_ID:'Income_ID'
    }

export function insertIncome(data) {
    let incomes=getAllIncomes();
    data['Income_ID'] = generateIncome_ID()
    incomes.push(data)
    localStorage.setItem(iKEYS.incomes, JSON.stringify(incomes))
}

export function updateIncome(data) {
    let incomes=getAllIncomes();
    let recordIndex = incomes.findIndex(x => x.Income_ID === data.Income_ID)
    incomes[recordIndex] = { ...data }
    localStorage.setItem(iKEYS.incomes, JSON.stringify(incomes))
}

export function generateIncome_ID() {
    if (localStorage.getItem(iKEYS.Income_ID) == null)
        localStorage.setItem(iKEYS.Income_ID, '0')
    var id = parseInt(localStorage.getItem(iKEYS.Income_ID))
    localStorage.setItem(iKEYS.Income_ID, (++id).toString())
    return id;
}
export function getAllIncomes() {
    if (localStorage.getItem(iKEYS.incomes) == null)
        localStorage.setItem(iKEYS.incomes, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(iKEYS.incomes));
}

export function deleteIncome(Income_ID) {
    let incomes = getAllIncomes();
    incomes = incomes.filter(x => x.Income_ID !== Income_ID);
    localStorage.setItem(iKEYS.incomes, JSON.stringify(incomes));
}
const dKEYS = {
    deductions: 'deductions',
    Deduction_ID:'Deduction_ID'
    }

    export function insertDeduction(data) {
        let deductions=getAllDeductions();
        data['Deduction_ID'] = generateDeduction_ID()
        deductions.push(data)
        localStorage.setItem(dKEYS.deductions, JSON.stringify(deductions))
    }
    
    export function updateDeduction(data) {
        let deductions=getAllDeductions();
        let recordIndex = deductions.findIndex(x => x.Deduction_ID === data.Deduction_ID)
        deductions[recordIndex] = { ...data }
        localStorage.setItem(dKEYS.deductions, JSON.stringify(deductions))
    }
    
    export function generateDeduction_ID() {
        if (localStorage.getItem(dKEYS.Deduction_ID) === null)
            localStorage.setItem(dKEYS.Deduction_ID, '0')
        var id = parseInt(localStorage.getItem(dKEYS.Deduction_ID))
        localStorage.setItem(dKEYS.Deduction_ID, (++id).toString())
        return id;
    }
    export function getAllDeductions() {
        if (localStorage.getItem(dKEYS.deductions) == null)
            localStorage.setItem(dKEYS.deductions, JSON.stringify([]))
        return JSON.parse(localStorage.getItem(dKEYS.deductions));
    }
    export function deleteDeduction(Deduction_ID) {
        let deductions = getAllDeductions();
        deductions = deductions.filter(x => x.Deduction_ID !== Deduction_ID);
        localStorage.setItem(dKEYS.deductions, JSON.stringify(deductions));
    }
    const sKEYS = {
        stateinfos: 'stateinfos',
        Stateinfo_ID:'Stateinfo_ID'
        }
    
        export function insertStateinfo(data) {
            let stateinfos=getAllStateinfos();
            data['Stateinfo_ID'] = generateStateinfo_ID()
            stateinfos.push(data)
            localStorage.setItem(sKEYS.stateinfos, JSON.stringify(stateinfos))
        }
        
        export function updateStateinfo(data) {
            let stateinfos=getAllStateinfos();
            let recordIndex = stateinfos.findIndex(x => x.Stateinfo_ID === data.Stateinfo_ID)
            stateinfos[recordIndex] = { ...data }
            localStorage.setItem(sKEYS.stateinfos, JSON.stringify(stateinfos))
        }
        
        export function generateStateinfo_ID() {
            if (localStorage.getItem(sKEYS.Stateinfo_ID) === null)
                localStorage.setItem(sKEYS.Stateinfo_ID, '0')
            var id = parseInt(localStorage.getItem(sKEYS.Stateinfo_ID))
            localStorage.setItem(sKEYS.Stateinfo_ID, (++id).toString())
            return id;
        }
        export function getAllStateinfos() {
            if (localStorage.getItem(sKEYS.stateinfos) == null)
                localStorage.setItem(sKEYS.stateinfos, JSON.stringify([]))
            return JSON.parse(localStorage.getItem(sKEYS.stateinfos));
        }
        export function deleteStateinfo(Stateinfo_ID) {
            let stateinfos = getAllStateinfos();
            stateinfos = stateinfos.filter(x => x.Stateinfo_ID !== Stateinfo_ID);
            localStorage.setItem(sKEYS.stateinfos, JSON.stringify(stateinfos));
        }