import { FormikProps } from "formik"
import { useGetEventsForDropdown } from "../../hooks/useEvents"
import { useTeams } from "../../hooks/useTeams"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea, Select } from "../ui/Input"
import { UserProfileDTO } from "../../types"

interface CreateEventFormValues {
  title: string;
  description: string;
  start: string;
  end: string;
  eventId: string;
  teamId: string;
}

interface CreateEventModalProps {
  formik: FormikProps<CreateEventFormValues>;
  onClose: () => void;
  loggedInUser: UserProfileDTO;
  isLoading?: boolean;
}

export default function CreateEventModal({ formik, onClose, loggedInUser, isLoading: isSubmitting = false }: CreateEventModalProps) {
      const { data: events, isLoading, isError } = useGetEventsForDropdown()
      const { data: team } = useTeams()
    if (isError || isLoading ){
        return null
    }
  return (
    <Modal isOpen={true} onClose={onClose} title="Create Event" size="md">
      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Input
            label="Title"
            placeholder="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title ? formik.errors.title : undefined}
            className="mb-2"
          />
          <Textarea
            label="Description"
            placeholder="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mb-2"
          />
          <Input
            label="Start Time"
            type="datetime-local"
            name="start"
            value={formik.values.start}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.start && formik.errors.start ? formik.errors.start : undefined}
            className="mb-2"
          />
          <Input
            label="End Time"
            type="datetime-local"
            name="end"
            value={formik.values.end}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.end && formik.errors.end ? formik.errors.end : undefined}
            className="mb-2"
          />
          <Select
            label="Event Type"
            name="eventId"
            value={formik.values.eventId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={[
              { value: "", label: "Select event" },
              ...(events ?? []).map(e => ({ value: e.id, label: e.name }))
            ]}
            error={formik.touched.eventId && formik.errors.eventId ? formik.errors.eventId : undefined}
            className="mb-2"
          />
          <Select
            label="Team"
            name="teamId"
            value={formik.values.teamId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={[
              { value: "", label: "Select Team" },
              ...(loggedInUser as any).teams?.map((e: any) => ({
                value: e.teamId,
                label: team?.find(t => t.id === e.teamId)?.name || e.name || 'Unknown Team'
              })) ?? []
            ]}
            error={formik.touched.teamId && formik.errors.teamId ? formik.errors.teamId : undefined}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting} type="button">
            Cancel
          </Button>
          <Button variant="success" type="submit" loading={isSubmitting}>
            Add Event
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
