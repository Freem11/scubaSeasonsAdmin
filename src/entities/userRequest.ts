export type UserRequest = {
    id: number
    created_by: string
    type: string
    entity: string
    entity_id: number
    data: JSON
    created_at: string
    updated_at: string
    updated_by: string
    approved: boolean
}