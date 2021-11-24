import gql from 'graphql-tag';

// ---------------------------------- QUERY

export const GET_TASK_BY_ID = gql`
    query task_by_pk($id: uuid!) {
        task_by_pk(id: $id) {
            id
            title
            description
            type
            priority
            progress
            created_at
            updated_at
        }
    }
`

export const GET_TASKS = gql`
    query task($where: task_bool_exp) {
        task(where: $where, order_by: {updated_at: asc} ) {
            id
            title
            description
            type
            priority
            progress
            created_at
            updated_at
        }
    }
`

// ---------------------------------- MUTATIONS

export const CREATE_TASK = gql`
    mutation task($title: String, $description: String, $type: Int, $priority: Int, $progress: Int) {
        insert_task(objects: {
            title: $title,
            description: $description,
            type: $type,
            priority: $priority,
            progress: $progress
        }) {
        affected_rows
        returning {
            id
            title
            description
            type
            priority
            progress
            created_at
            updated_at
        }
    }
}
`

export const UPDATE_TASK = gql`
    mutation task($id: uuid, $title: String, $description: String, $type: Int, $priority: Int, $progress: Int, $updated_at: String) {
        update_task_by_pk(
            pk_columns: { id: $id },
             _set: { description: $description, priority: $priority, progress: $progress, title: $title:, type: $type, updated_at: $updated_at}}) 
            {
                id
                title
                description
                type
                priority
                progress
                created_at
                updated_at
        }  
    }
`