import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, Text, Textarea, Image, IconButton, Stack, Flex, Spacer, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaBold, FaItalic, FaUnderline, FaImage } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      category,
      imageUrl,
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
    setCategory("");
    setImageUrl("");
    onClose();
  };

  const handleEditNote = () => {
    const updatedNotes = notes.map((note) => (note.id === selectedNote.id ? { ...note, title, content, category, imageUrl } : note));
    setNotes(updatedNotes);
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setCategory("");
    setImageUrl("");
    onClose();
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const openEditModal = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setImageUrl(note.imageUrl);
    onOpen();
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Flex align="center" mb={8}>
        <Heading as="h1" size="xl">
          Note-Taking App
        </Heading>
        <Spacer />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
          Create Note
        </Button>
      </Flex>

      <Stack spacing={4}>
        {notes.map((note) => (
          <Box key={note.id} p={4} borderWidth={1} borderRadius="md">
            <Flex align="center" mb={2}>
              <Heading as="h2" size="md">
                {note.title}
              </Heading>
              <Spacer />
              <IconButton icon={<FaEdit />} aria-label="Edit Note" variant="ghost" onClick={() => openEditModal(note)} />
              <IconButton icon={<FaTrash />} aria-label="Delete Note" variant="ghost" onClick={() => handleDeleteNote(note.id)} />
            </Flex>
            <Text mb={2}>{note.content}</Text>
            {note.imageUrl && <Image src={note.imageUrl} alt="Note Image" mb={2} />}
            <Text fontSize="sm" color="gray.500">
              Category: {note.category}
            </Text>
          </Box>
        ))}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedNote ? "Edit Note" : "Create Note"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} mb={4} />
            <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} mb={4} />
            <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} mb={4} />
            <Input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} mb={4} />
            <Flex>
              <IconButton icon={<FaBold />} aria-label="Bold" variant="ghost" />
              <IconButton icon={<FaItalic />} aria-label="Italic" variant="ghost" />
              <IconButton icon={<FaUnderline />} aria-label="Underline" variant="ghost" />
              <IconButton icon={<FaImage />} aria-label="Image" variant="ghost" />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={selectedNote ? handleEditNote : handleCreateNote}>
              {selectedNote ? "Save Changes" : "Create"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
